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
    #Helper.push_to_followers(payload)
    #Helper.regex_hashtag(payload)
    #Helper.regex_mention(payload)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("follow", payload, socket) do
    IO.inspect(payload)
    uid_origin = payload["uid_origin"]
    uid_follow = payload["uid_follow"]
    Wrapper.add_follower(uid_origin, uid_follow)
    {:reply, {:ok, payload}, socket}
  end

end
