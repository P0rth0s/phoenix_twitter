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
    Engine.login(payload)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("tweet", payload, socket) do
    payload = Engine.tweet(payload)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("follow", payload, socket) do
    Engine.follow(payload)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("query_timeline", payload, socket) do
    tweets = Engine.query_timeline(payload)
    {:reply, {:ok, %{"tweets" => tweets}}, socket}
  end

  def handle_in("query_mentions", payload, socket) do
    tweets = Engine.query_mentions(payload)
    {:reply, {:ok, %{"tweets" => tweets}}, socket}
  end

  def handle_in("query_hashtags", payload, socket) do
    res = elem(Wrapper.query_hashtag(payload["hashtag"]), 1)
    case res do
      [{Hashtags, _hashtag, hashtag_tweet_ids}] ->
        tweets = Helper.get_tweets_of_list(hashtag_tweet_ids)
        tweets = Helper.js_sanatize(tweets)
        {:reply, {:ok, %{"tweets" => tweets}}, socket}
      _ ->
        IO.inspect("No hashtag found")
        {:reply, {:none, payload}, socket}
    end
  end
end
