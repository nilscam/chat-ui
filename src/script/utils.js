const randomUsersPictures = (nb) => {
  var list = []
  let genderList = ['men', 'women']

  for (let i = 0; i < nb; i++) {
    let gender = genderList[Math.round(Math.random())]
    let number = Math.floor(Math.random()*70)

    list.push(`https://randomuser.me/api/portraits/${gender}/${number}.jpg`)
  }
  return list
}

const messages = [
  {
    author: {
      user_id: 'Thomas',
      profile_picture: 'https://randomuser.me/api/portraits/men/18.jpg'
    },
    text: 'salut'
  },
  {
    author: {
      user_id: 'Nils',
      profile_picture: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    text: 'hey, ça vas ? 😀'
  },
  {
    author: {
      user_id: 'Thomas',
      profile_picture: 'https://randomuser.me/api/portraits/men/18.jpg'
    },
    text: 'ouai super 😂😂😂😂'
  },
  {
    author: {
      user_id: 'Thomas',
      profile_picture: 'https://randomuser.me/api/portraits/men/18.jpg'
    },
    text: 'tu fais quoi ?'
  },
  {
    author: {
      user_id: 'Nils',
      profile_picture: 'https://randomuser.me/api/portraits/men/26.jpg'
    },
    text: 'rien de spécial et toi ?'
  }
]

export default {
  randomUsersPictures,
  messages
}
