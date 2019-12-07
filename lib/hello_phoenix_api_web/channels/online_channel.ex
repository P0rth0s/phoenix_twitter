defmodule HelloPhoenixApiWeb.OnlineChannel do
  use HelloPhoenixApiWeb, :channel

  def join("online:lobby", _payload, socket) do
    {:ok, socket}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("login", payload, socket) do
    transport_pid = elem(Map.fetch(socket, :transport_pid), 1)
    name = payload["name"]
    user = %{uid: name, pid: transport_pid}
    Engine.login(user)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("tweet", payload, socket) do
    #TODO FIX socket pid changes from login
    #TODO fix tweet id assignment
    IO.inspect(payload)
    val = Enum.random(0 .. 1000)
    payload = Map.put(payload, "tweet_id", val)
    Wrapper.create_tweet(payload)
    #TODO implement all this shit
    Helper.push_to_followers(payload)
    Helper.regex_hashtag(payload)
    Helper.regex_mention(payload)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("follow", payload, socket) do
    IO.inspect(payload)
    uid_origin = payload["uid_origin"]
    uid_follow = payload["uid_follow"]
    Wrapper.add_follower(uid_origin, uid_follow)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("query_timeline", payload, socket) do
    [{Users, _uid, _pid, _followers, timeline, _mentions}] = elem(Wrapper.get_user(elem(Map.fetch(payload, "name"), 1)), 1)
    tweets = Helper.get_tweets_of_list(timeline)
    IO.inspect(tweets) #TODO Prints successfully convert to js reply for all these
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("query_mentions", payload, socket) do
    [{Users, _uid, _pid, _followers, _timeline, mentions}] = elem(Wrapper.get_user(elem(Map.fetch(payload, "name"), 1)), 1)
    tweets = Helper.get_tweets_of_list(mentions)
    IO.inspect(tweets)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("query_hashtags", payload, socket) do
    res = elem(Wrapper.query_hashtag(payload["hashtag"]), 1)
    case res do
      [{Hashtags, _hashtag, hashtag_tweet_ids}] ->
        tweets = Helper.get_tweets_of_list(hashtag_tweet_ids)
        IO.inspect(tweets)
        {:reply, {:ok, payload}, socket}
      _ ->
        IO.inspect("No hashtag found")
        {:reply, {:ok, payload}, socket}
    end
  end
end
