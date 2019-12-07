defmodule HelloPhoenixApiWeb.OnlineChannel do
  use HelloPhoenixApiWeb, :channel

  def join(channel, payload, socket) do
    IO.inspect('PAYLOAD')
    IO.inspect(payload)
    name = payload["name"]
    case channel do
      "online:lobby" ->
        join(Enum.join(["online:", name]), %{}, socket)
        {:ok, socket}
      _ ->
         {:ok, socket}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("login", payload, socket) do
    IO.inspect(socket)
    name = payload["name"]
    private_channel = Enum.join(["online:", name])
    user = %{uid: name, pid: private_channel}
    #Wrapper.delete_user(user) #reroute pid socket pid info
    Wrapper.create_user(user)
    IO.inspect("LOGIN")
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("tweet", payload, socket) do
    #TODO fix tweet id assignment
    IO.inspect(payload)
    val = Enum.random(0 .. 1000)
    payload = Map.put(payload, "tweet_id", val)
    Wrapper.create_tweet(payload)
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
