const express = require('express')
const nunjucks = require("nunjucks")

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")
nunjucks.configure("views", {
    express: server,
    autoescape:false
})

server.get("/",function(req,res){
    const about = {
        avatar_url:"https://media-exp1.licdn.com/dms/image/C4D03AQEsf9WZ42K7Lw/profile-displayphoto-shrink_200_200/0?e=1599091200&v=beta&t=H0CZbHEzpRJAG5juYOSJ3OR8Mr9qOA4C2bU6bW9Dkko",
        name: " Kauy Lyra",
        role: "Programador :",
        description1: "Front-End ;  HTML, JavaScript,  Css.",
        description2: "Back-End ; C# , SQL Server.",
        links:[
            {name: "LinkedIn",url:"https://www.linkedin.com/in/kauy-lyra-99a6a11a2/"},
            {name: "Github",url:"https://www.github.com/kauylyra/"},
            {name: "Instagram",url:"https://www.instagram.com/kauylyra/"}
        ]
    }
    return res.render("about",{ about })
})

server.get("/portfolio",function(req,res){
    return res.render("portfolio",{ items: videos })
})

server.get("/video",function(req,res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if(!video){
        return res.send("video not found")
    }

    return res.render("video",{ item: video } )
})


server.listen(5000, function(){
    console.log("server is running")
})