import React from "react"
import styled from "styled-components"
import Card from "./Card"

import Dan from "./assets/dan.jpg"
import Dan2 from "./assets/dan2.jpg"
import Liam from "./assets/liam.jpg"
import Leon from "./assets/leon.jpg"
import Stu from "./assets/Stu.jpg"
import Rach from "./assets/rach.jpg"
import Dave from "./assets/dave.jpg"
import Andy from "./assets/andy.jpg"
import Sid from "./assets/sid.jpeg"

const Grid = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px 20px;
  width: 660px;
`
const ResetButton = styled.button`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-50%, 0);
  color: #fff;
  font-size: 24px;
  background-color: #f7aa3a;
  border: none;
  border-radius: 10px;
  /* height: 25px; */
  padding: 5px 20px;
`

class App extends React.Component {
  state = {
    cards: [
      { id: 14, flipped: false, value: 7, image: Dan2 },
      { id: 1, flipped: false, value: 1, image: Andy },
      { id: 2, flipped: false, value: 2, image: Stu },
      { id: 3, flipped: false, value: 3, image: Dave },
      { id: 12, flipped: false, value: 6, image: Rach },
      { id: 4, flipped: false, value: 4, image: Sid },
      { id: 5, flipped: false, value: 1, image: Andy },
      { id: 8, flipped: false, value: 4, image: Leon },
      { id: 9, flipped: false, value: 5, image: Dan },
      { id: 6, flipped: false, value: 2, image: Stu },
      { id: 16, flipped: false, value: 8, image: Liam },
      { id: 11, flipped: false, value: 6, image: Rach },
      { id: 13, flipped: false, value: 7, image: Dan2 },
      { id: 10, flipped: false, value: 5, image: Dan },
      { id: 7, flipped: false, value: 3, image: Dave },
      { id: 15, flipped: false, value: 8, image: Liam }
    ],
    selected1: null,
    selected2: null
  }

  handleReset = () => {
    const { cards } = this.state
    let newCards = cards

    for (let i = 0; i < newCards.length; i++) {
      newCards[i].flipped = false
    }

    this.setState({ cards: newCards })
  }

  handleSelect = cardIndex => {
    const { cards, selected1, selected2 } = this.state
    let newCards = cards
    let currentCard = newCards[cardIndex]
    if (selected1 == null && selected2 == null && currentCard.flipped) {
      return
    } else if (selected1 == null && selected2 == null) {
      newCards[cardIndex].flipped = !currentCard.flipped
      currentCard.index = cardIndex
      this.setState({ cards: newCards, selected1: currentCard })
    } else if (
      currentCard.id !== selected1.id &&
      selected1 != null &&
      selected2 == null
    ) {
      newCards[cardIndex].flipped = !currentCard.flipped
      this.setState({ cards: newCards, selected2: currentCard })

      setTimeout(() => {
        if (selected1.value !== currentCard.value) {
          newCards[selected1.index].flipped = false
          newCards[cardIndex].flipped = !currentCard.flipped
          this.setState({ cards: newCards, selected2: null, selected1: null })
        } else {
          this.setState({ selected2: null, selected1: null })
        }
      }, 1000)
    }
  }

  render() {
    const { cards } = this.state
    return (
      <>
        <Grid>
          {cards.map((item, index) => (
            <Card
              key={item.id}
              handleSelect={this.handleSelect}
              flipped={item.flipped}
              index={index}
              image={item.image}
            />
          ))}
        </Grid>
        <ResetButton onClick={() => this.handleReset()}>RESET</ResetButton>
      </>
    )
  }
}

export default App
