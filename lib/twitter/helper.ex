defmodule Helper do

  # Add tweet to all of the tweeters followers timelines
  def push_to_followers(tweet) do
    tweet_id = elem(Map.fetch(tweet, "tweet_id"), 1)
    [{Users, _uid, _pid, followers, _timeline, _mentions}] = elem(Wrapper.get_user(elem(Map.fetch(tweet, "uid"), 1)), 1)
    push_to_followers(followers, tweet_id)
  end
  def push_to_followers([], _tweet_id) do :done end
  def push_to_followers([hd | tl], tweet_id) do
    Wrapper.add_timeline(hd, tweet_id)
    push_to_followers(tl, tweet_id)
  end

  def push_retweet(uid, tweet_id) do
    [{Users, _uid, _pid, followers, _timeline, _mentions}] = elem(Wrapper.get_user(uid), 1)
    push_to_followers(followers, tweet_id)
  end

  # Get list of tweets corresponding to list of tweet_ids
  def get_tweets_of_list(timeline) do get_tweets_of_list(timeline, []) end
  def get_tweets_of_list([], tweets) do tweets end
  def get_tweets_of_list([hd | tl], tweets) do
    tweets = [Wrapper.get_tweet(hd) | tweets]
    get_tweets_of_list(tl, tweets)
  end

  def regex_hashtag(tweet) do
    msg = elem(Map.fetch(tweet, "msg"), 1)
    tweet_id = elem(Map.fetch(tweet, "tweet_id"), 1)
    case Regex.scan(~r/#[a-zA-z0-9]+/, msg) do
      nil->
        :no_match
      lst ->
        lst = List.flatten(lst)
        add_hashtags(lst, tweet_id)
    end
  end

  def regex_mention(tweet) do
    IO.inspect("***")
    IO.inspect(tweet)
    msg = elem(Map.fetch(tweet, "msg"), 1)
    case Regex.scan(~r/@[a-zA-z0-9]+/, msg) do
      nil->
        :no_match
      lst ->
        lst = List.flatten(lst)
        add_mentions(lst, tweet)
    end
  end

  # NOTE : Assumes only valid mentions
  def add_mentions([], _tweet) do :done end
  def add_mentions([hd | tl], tweet) do
    tweet_id = elem(Map.fetch(tweet, "tweet_id"), 1)
    uid = String.slice(hd, 1, String.length(hd))
    Wrapper.add_mention(uid, tweet_id)
    add_mentions(tl, tweet)
  end

  def add_hashtags([], _tweet_id) do :done end
  def add_hashtags([hd |tl], tweet_id) do
    Wrapper.handle_hashtag(hd, tweet_id)
    add_hashtags(tl, tweet_id)
  end

  def push_live_timeline(pid, tweet_id) do
    case pid do
      nil -> :done
      _ ->
        tweet = Wrapper.get_tweet(tweet_id)
        tweet = Helper.js_sanatize([tweet])
        HelloPhoenixApiWeb.Endpoint.broadcast(pid, "timeline_push", %{"tweet" => tweet})
    end
  end

  def push_live_mention(pid, tweet_id) do
    case pid do
      nil -> :done
      _ ->
        tweet = Wrapper.get_tweet(tweet_id)
        tweet = Helper.js_sanatize([tweet])
        HelloPhoenixApiWeb.Endpoint.broadcast(pid, "mention_push", %{"tweet" => tweet})
    end
  end

  def js_sanatize(tweets) do js_sanatize(tweets, []) end
  def js_sanatize([], sanatized) do sanatized end
  def js_sanatize([hd | tl], sanatized) do
    {:atomic, [{Tweets, my_tweet_id, my_uid, my_msg}]} = hd
    map = %{"tweet_id" => my_tweet_id, "uid" => my_uid, "msg" => my_msg}
    sanatized = [map | sanatized]
    js_sanatize(tl, sanatized)
  end
end
