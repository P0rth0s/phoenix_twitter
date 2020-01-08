defmodule Engine do
    def login(payload) do
        name = payload["name"]
        private_channel = Enum.join(["online:", name])
        user = %{uid: name, pid: private_channel}
        #Wrapper.delete_user(user) #reroute pid socket pid info
        Wrapper.create_user(user)
    end

    def tweet(payload) do
        #TODO fix tweet id assignment
        val = Enum.random(0 .. 1000)
        payload = Map.put(payload, "tweet_id", val)
        Wrapper.create_tweet(payload)
        Task.async(fn -> Helper.push_to_followers(payload) end)
        Task.async(fn -> Helper.regex_hashtag(payload) end)
        Task.async(fn -> Helper.regex_mention(payload) end)
        payload
    end

    def follow(payload) do
        uid_origin = payload["uid_origin"]
        uid_follow = payload["uid_follow"]
        Wrapper.add_follower(uid_origin, uid_follow)
    end

    def query_mentions(payload) do
        [{Users, _uid, _pid, _followers, _timeline, mentions}] = elem(Wrapper.get_user(elem(Map.fetch(payload, "name"), 1)), 1)
        tweets = Helper.get_tweets_of_list(mentions)
        Helper.js_sanatize(tweets)
    end

    def query_hashtags do
        :ok
    end

    def query_timeline(payload) do
        [{Users, _uid, _pid, _followers, timeline, _mentions}] = elem(Wrapper.get_user(elem(Map.fetch(payload, "name"), 1)), 1)
        tweets = Helper.get_tweets_of_list(timeline)
        Helper.js_sanatize(tweets)
    end
end