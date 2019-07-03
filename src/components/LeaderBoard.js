import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles';
import ConnectedLeaderBoardItem from './LeaderBoardItem'

const style = theme => ({
    board: {
        maxWidth: 400,
        display: "flex",
        flexDirection: "column",
        border: `0.5px ${theme.palette.divider} solid`,
        borderRadius: 5,
    },
    list: {
        padding: 10,
        '& > div': {
            marginTop: 10,
        }
    }
})

const calLength = (obj) => !Array.isArray(obj) ? Object.keys(obj).length : obj.length

const sortUserLeader = (users) => Object.keys(users).sort((a, b) => calLength(users[b].answers) + calLength(users[b].questions) - calLength(users[a].answers) - calLength(users[a].questions))

const calPrize = (index) => index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : "none"

class LeaderBoard extends Component {


    render() {

        const { classes, users, userIds } = this.props

        console.log(users, userIds)
        return (
            <div className={classes.board}>
                <div className={classes.list}>
                    {
                        userIds.map((id, index) => (
                            <ConnectedLeaderBoardItem
                                key={id}
                                prize={calPrize(index)}
                                name={users[id].name}
                                answers={users[id].answers}
                                questions={users[id].questions}
                                logo={users[id].avatarURL}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }
}
//mapStateToProps, mapDispatchToProps
function mapStateToProps({ users }) {
    return {
        users,
        userIds: sortUserLeader(users)
    }
}
export default connect(mapStateToProps)(withStyles(style)(LeaderBoard))