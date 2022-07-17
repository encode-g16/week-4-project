const express = require('express')

const app = express()


app.get("/nfts/metadata/:id", (req, res) => {

  res.json({
    name: "bulbasaur",
    image: "/ipfs/QmPz2aAtDzTL4mvWGyENUJyWxyyBWMGPq4qZN5VvYQysmn/bulbasaur.png"
  })
})




app.listen(8000, () => {
    console.log("listening on port 8000")
})