// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class Home extends Component {
  state = {
    teamList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getResponses()
  }

  getResponses = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const {teams} = data

    const update = teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teamList: update, isLoading: false})
  }

  render() {
    const {teamList, isLoading} = this.state

    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo-image"
          />
          <h1 className="title">IPL Dashboard</h1>
        </div>

        {isLoading && (
          <div>
            <Loader type="Oval" color="#00Bfff" height={50} width={50} />
          </div>
        )}

        {!isLoading && (
          <ul className="team-list">
            {teamList.map(each => (
              <TeamCard teamDetails={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default Home
