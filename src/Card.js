import React, { Component } from "react"
import styled from "styled-components"
import LogoAsset from "./assets/logo.png"

const CardStyled = styled.div`
  height: 150px;
  width: 150px;
  background-color: #1d1e21;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 10%;
`

const Logo = styled.img`
  height: 60px;
  /* opacity: 0.8; */
`

const CardImg = styled.img`
  height: 150px;
  border-radius: 10%;
`

class Card extends Component {
  render() {
    const { flipped, handleSelect, index, image } = this.props
    return (
      <>
        {flipped ? (
          <CardStyled onClick={() => handleSelect(index)} flipped image={image}>
            <CardImg src={image} alt="Beautiful face here" />
          </CardStyled>
        ) : (
          <CardStyled onClick={() => handleSelect(index)}>
            {/* Card: {value} */}
            <Logo height="60px" src={LogoAsset} alt="Beautiful face here" />
          </CardStyled>
        )}
      </>
    )
  }
}

export default Card
