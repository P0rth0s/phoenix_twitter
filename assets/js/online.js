let online = {

    init(socket) {
        let channel = socket.channel('online:lobby', {})
        console.log(socket)
        let href = window.location.href
        channel.join()
        if(href == "http://localhost:4000/") {
            this.listenForLogin(channel)
        } else if(href.substring(0, 27) == "http://localhost:4000/user/") {
            this.queryTimeline(channel)
            this.listenForTweet(channel)
            this.listenForFollow(channel)
            this.listenButtons(channel)
            this.listenHashtag(channel)
        }
    },

    listenForLogin(channel) {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault()
            let userName = document.getElementById('userName').value
            console.log(userName)
            channel.push('login', {name: userName}).receive(
                "ok", (reply) => {
                    window.location.href = "http://localhost:4000/user/" + userName }
                
                //TODO add err for already exist
            )
        })
    },

    listenForTweet(channel) {
        document.getElementById('tweet-form').addEventListener('submit', (e) => {
            e.preventDefault()
            let message = document.getElementById('message').value
            message = 'temp hardcoded message online.js line 35 @w'
            name = window.location.href.split('/')[4].replace('?', '')
            channel.push('tweet', {msg: message, uid: name}).receive(
                "ok", (reply) =>
                    console.log('received')
            )
            //document.getElementById('message').value = ''
        })
    },

    listenForFollow(channel) {
        document.getElementById('follow-form').addEventListener('submit', (e) => {
            e.preventDefault()
            console.log('follow req made')
            let message = document.getElementById('message').value
            name = window.location.href.split('/')[4].replace('?', '')
            //TODO change to user origin user follow
            channel.push('follow', {uid_follow: message, uid_origin: name}).receive(
                "ok", (reply) =>
                    console.log('follow completed')
            )
            //document.getElementById('message').value = ''
        })
    },

    listenButtons(channel) {
        let t = this
        document.getElementById("timeline-button").addEventListener("click", (e) => {
            document.getElementById("tweet_table_type").innerHTML = "Timeline";
            t.queryTimeline(channel)
        })
        document.getElementById("mentions-button").addEventListener("click", (e) => {
            document.getElementById("tweet_table_type").innerHTML = "Mentions";
            t.queryMentions(channel)
        })
    },

    listenHashtag(channel) {
        let t = this
        document.getElementById('hashtag-form').addEventListener('submit', (e) => {
            e.preventDefault()
            let hashtag = document.getElementById('hashtag').value
            document.getElementById("tweet_table_type").innerHTML = hashtag;
            t.queryHashtags(channel, hashtag)
        })
    },

    queryTimeline(channel) {
        name = window.location.href.split('/')[4].replace('?', '')
        channel.push('query_timeline', {name: name}).receive(
            "ok", (reply) =>
                console.log("queried tweets: " + JSON.stringify(reply))
                //TODO fix replies so can receive
                //TODO append replies to timeline table
        )
    },

    queryMentions(channel) {
        name = window.location.href.split('/')[4].replace('?', '')
        channel.push('query_mentions', {name: name}).receive(
            "ok", (reply) =>
                console.log("queried mentions: " + JSON.stringify(reply))
                //TODO fix replies so can receive
                //TODO append replies to timeline table
        )
    },

    queryHashtags(channel, hashtag) {
        channel.push('query_hashtags', {hashtag: hashtag}).receive(
            "ok", (reply) =>
                console.log("queried hashtag: " + JSON.stringify(reply))
                //TODO fix replies so can receive
                //TODO append replies to timeline table
        )
    }
}

export default online