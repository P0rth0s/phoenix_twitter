let online = {

    init(socket) {
        let channel = socket.channel('online:lobby', {})
        console.log(socket)
        let href = window.location.href
        channel.join()
        if(href == "http://localhost:4000/") {
            this.listenForLogin(channel)
        } else if(href.substring(0, 27) == "http://localhost:4000/user/") {
            //this.queryTimeline(channel)
            this.listenForTweet(channel)
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
            let message = document.getElementById('message').nodeValue
            channel.push('tweet', {message: message}).receive(
                "ok", (reply) =>
                    console.log('received')
                //TODO add err for already exist
            )
            document.getElementById('message').value = ''
        })
    },

    queryTimeline(channel) {
        channel.push('queryTimeline', {name: userName})
    }
}

export default online