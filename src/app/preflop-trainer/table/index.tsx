'use client'

import { Card, getCardString } from '@lib/types/card'
import './styles.scss'
import classnames from 'classnames'
import { Player } from '@lib/types/player'

export type TableProps = {
  holeCards: Player[],
  openVillanCards: boolean,
  result: string
}

const seatClassnames = classnames([
  'seat'
])

export default function Table({
  holeCards,
  openVillanCards,
  result
}: TableProps) {
  return (
    <div className="container-fluid">
      <div className="resultMessage">{result}</div>
      <div className="table"></div>
      <div className={`handed-${holeCards.length}`}>
        {displayOpenedCards(holeCards[0].holeCards, true)}
        {holeCards.filter((_, index) => index !== 0).map(({ holeCards }) => {
          return openVillanCards ? displayOpenedCards(holeCards) : displayVillanCards()
        })}
      </div>
    </div>
  )
}

function displayVillanCards(): JSX.Element {
  return (
    <div className={`${seatClassnames}`}>
      <img className="holeCards" src="/cards/card_back.png" alt="villan hole cards" />
      <img className="holeCards" src="/cards/card_back.png" alt="villan hole cards" />
    </div>
  )
}

function displayOpenedCards(cards: Card[], isHero: boolean | undefined = false): JSX.Element {

  return (
    <div className={`${isHero ? 'hero' : ''} ${seatClassnames}`}>
      {cards.map((card, index) => {
        const cardName = getCardString(card)

        return isHero ? <img className={`card${index}`} src={`/cards/${cardName}.png`} key={cardName} alt={cardName} />
          : <img className="holeCards" src={`/cards/${cardName}.png`} key={cardName} alt={cardName} />
      })}
    </div>
  )
}