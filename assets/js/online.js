let online = {

    init(socket) {
        console.log(socket)
        let href = window.location.href
        if(href == "http://localhost:4000/") {
            this.listenForLogin()
        } else if(href.substring(0, 27) == "http://localhost:4000/user/") {
            let name = window.location.href.split('/')[4].replace('?', '')
            let channela = socket.channel('online:lobby', {name: name})
            channela.join()
            let channel = socket.channel('online:'+name, {name: name})
            channel.join()
            this.login(channel)
            this.listenForTweet(channel)
            this.listenForFollow(channel)
            this.listenButtons(channel)
            this.listenHashtag(channel)
            this.listenPushes(channel)
        }
    },

    listenForLogin() {
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault()
            let userName = document.getElementById('userName').value
            window.location.href = "http://localhost:4000/user/" + userName
        })
    },

    login(channel) {
        let t = this
        window.onload= function(){
            let userName = window.location.href.split('/')[4].replace('?', '')
            channel.push('login', {name: userName}).receive(
                "ok", (reply) => {
                    console.log("logged in")
                    t.queryTimeline(channel)
                }
                //TODO add err for already exist
            )
        }
    },

    listenForTweet(channel) {
        document.getElementById('tweet-form').addEventListener('submit', (e) => {
            e.preventDefault()
            let message = document.getElementById('message_tweet').value
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
        let t = this
        name = window.location.href.split('/')[4].replace('?', '')
        channel.push('query_timeline', {name: name}).receive(
            "ok", (reply) => {
                let tweets = reply["tweets"]
                t.replace_table(tweets)
            }
        )
    },

    queryMentions(channel) {
        let t = this
        name = window.location.href.split('/')[4].replace('?', '')
        channel.push('query_mentions', {name: name}).receive(
            "ok", (reply) => {
                console.log("queried mentions: " + JSON.stringify(reply))
                let tweets = reply["tweets"]
                t.replace_table(tweets)
            }
        )
    },

    queryHashtags(channel, hashtag) {
        channel.push('query_hashtags', {hashtag: hashtag}).receive(
            "ok", (reply) => {
                console.log("queried hashtag: " + JSON.stringify(reply))
                let tweets = reply["tweets"]
                replace_table(tweets)
            }
        )
    },

    listenPushes(channel) {
        let t = this
        let table = document.getElementById("tweet_table");
        channel.on("mention_push", payload => {
            console.log("got mention push")
            if(document.getElementById("tweet_table_type").innerHTML == "Mentions") {
                t.add_row(table, payload["tweet"].pop())
            }
        })
        channel.on("timeline_push", payload => {
            if(document.getElementById("tweet_table_type").innerHTML == "Timeline") {
                console.log("got timeline push")
                t.add_row(table, payload["tweet"].pop())
            }
        })
    },

    replace_table(tweets) {
        let table = document.getElementById("tweet_table");
        while(table.hasChildNodes()) {
            table.removeChild(table.firstChild)
        }
        let row = table.insertRow(-1)
        let cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "User";
        cell2.innerHTML = "Message";
        while(tweets.length != 0) {
            let top = tweets.pop()
            this.add_row(table, top)
        }
        console.log('table created')
    },

    add_row(table, tweet){
        console.log(tweet)
        let row = table.insertRow(-1)
        let cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = tweet["uid"];
        cell2.innerHTML = tweet["msg"];
        return null
    }
}

export default online