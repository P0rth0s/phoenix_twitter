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
        }
    },

    listenForLogin(channel) {
        document.getElementById('login-form').addEventListener('submit', function(e) {
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
        document.getElementById('tweet-form').addEventListener('submit', function(e) {
            e.preventDefault()
            let message = document.getElementById('message').value
            message = 'temp hardcoded message online.js line 35'
            name = window.location.href.split('/')[4]
            channel.push('tweet', {msg: message, uid: name}).receive(
                "ok", (reply) =>
                    console.log('received')
            )
            //document.getElementById('message').value = ''
        })
    },

    listenForFollow(channel) {
        document.getElementById('follow-form').addEventListener('submit', function(e) {
            e.preventDefault()
            console.log('follow req made')
            let message = document.getElementById('message').value
            name = window.location.href.split('/')[4]
            //TODO change to user origin user follow
            channel.push('follow', {uid_follow: message, uid_origin: name}).receive(
                "ok", (reply) =>
                    console.log('follow completed')
            )
            //document.getElementById('message').value = ''
        })
    },

    queryTimeline(channel) {
        name = window.location.href.split('/')[4]
        channel.push('query_timeline', {name: name}).receive(
            "ok", (reply) =>
                console.log("queried tweets: " + JSON.stringify(reply))
                //TODO append replies to timeline table
        )
    }
}

export default online