import React, { Component } from "react"
import styled from "styled-components"
import Card from "./Card"
import { Reset } from "./Reset"

import Dan from "./assets/dan.jpg"
import Dan2 from "./assets/dan2.jpg"
import Liam from "./assets/liam.jpg"
import Leon from "./assets/leon.jpg"
import Stu from "./assets/Stu.jpg"
import Rach from "./assets/rach.jpg"
import Dave from "./assets/dave.jpg"
import Andy from "./assets/andy.jpg"
import Sid from "./assets/sid.jpeg"
import pengTing from "./assets/ok.png"
import github from "./assets/github.png"
import reset from "./assets/reset.png"

class App extends Component {
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
    selected2: null,
    count: 0,
    loading: true
  }

  componentDidMount() {
    let cardDeck = this.state.cards
    cardDeck = shuffle(cardDeck)
    this.setState({ cards: cardDeck, loading: false })
  }

  handleReset = () => {
    const { cards } = this.state
    let newCards = cards

    // Set all cards to back to unflipped
    for (let i = 0; i < newCards.length; i++) {
      newCards[i].flipped = false
    }

    newCards = shuffle(newCards)
    this.setState({ cards: newCards, count: 0 })
  }

  handleSelect = cardIndex => {
    const { cards, selected1, selected2, count } = this.state

    let newCards = cards
    let currentCard = newCards[cardIndex]

    if (selected1 == null && selected2 == null && currentCard.flipped) {
      // Check that the selected card isn't already flipped
      return
    } else if (selected1 == null && selected2 == null) {
      // Flip the first card
      newCards[cardIndex].flipped = !currentCard.flipped
      currentCard.index = cardIndex
      this.setState({ cards: newCards, selected1: currentCard })
    } else if (
      currentCard.id !== selected1.id &&
      selected1 != null &&
      selected2 == null
    ) {
      // Flip the second card
      newCards[cardIndex].flipped = !currentCard.flipped
      this.setState({ cards: newCards, selected2: currentCard })

      // Check the 2 flipped cards for a match
      setTimeout(() => {
        if (selected1.value !== currentCard.value) {
          // Turn both back
          newCards[selected1.index].flipped = false
          newCards[cardIndex].flipped = !currentCard.flipped
          this.setState({ cards: newCards, selected2: null, selected1: null })
        } else {
          // Keep them turned
          this.setState({ selected2: null, selected1: null, count: count + 1 })
        }
      }, 1000)
    }
  }

  render() {
    const { cards, count } = this.state
    return (
      <>
        {count === cards.length / 2 ? (
          <>
            <Message>
              {/* <MessageImage src={pengTing} alt="Sweet" /> */}
              <>You won, congrats kid</>
              <EndGameReset onClick={() => this.handleReset()}>
                <Reset image={reset} />
              </EndGameReset>
            </Message>
          </>
        ) : (
          <Wrapper>
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
            <div>
              <MenuButton alt>Code Nation Mix & Match</MenuButton>
              <a href="https://github.com/benmaudslay/match-up">
                <MenuButton alt>
                  <img height="80" width="80" src={github} alt="Github" />
                </MenuButton>
              </a>
              <MenuButton onClick={() => this.handleReset()}>
                <Reset image={reset} />
              </MenuButton>
            </div>
          </Wrapper>
        )}
      </>
    )
  }
}

export default App

const shuffle = cardDeck => {
  for (let i = cardDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    let temp = cardDeck[i]
    cardDeck[i] = cardDeck[j]
    cardDeck[j] = temp
  }

  return cardDeck
}

// Styled Components
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px 15px;
  width: 660px;
`
const MenuButton = styled.button`
  color: ${props => (props.alt ? "black" : "#fff")};
  font-size: 24px;
  height: 150px;
  width: 150px;
  background-color: ${props => (props.alt ? "#fff" : "#f7aa3a")};
  border: ${props => (props.alt ? "5px #1d1e21 solid" : "none")};
  border-radius: 10%;
  padding: 5px 20px;
  margin-bottom: 15px;
  font-family: Gilroy;
  /* Center content */
  display: flex;
  align-items: center;
  justify-content: center;
`

const EndGameReset = styled(MenuButton)`
  position: unset;
  top: 0;
  left: 0;
  transform: none;
  margin-top: 20px;
`

const Message = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 24px;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`

const MessageImage = styled.img`
  height: 96px;
  width: 96px;
  padding: 10px;
`
