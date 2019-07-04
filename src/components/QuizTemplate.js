import React from 'react'
import logo from './../logo.svg'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card/index'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent';


QuizTemplate.propTypes = {
    children: PropTypes.element,
    avatarSize: PropTypes.number
}

export default function QuizTemplate(props) {


    const getAvatarWidth = () => {
        return props.avatarSize ? props.avatarSize : 80;
    }

    const createStyle = makeStyles((theme) => ({
        card: {
            maxWidth: 400,
            padding: 0,
            "&root": {
                padding: 0
            }
        },
        header: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
            textAlign: "left",
            '& span': {
                fontSize: "1em",
            }
        },
        content: {
            display: "flex",
            paddingLeft: 0,
            paddingRight: 0
        },
        avatar: {
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        avatarLogo: {
            width: getAvatarWidth(),
            height: getAvatarWidth(),
            border: `0.5px ${theme.palette.divider} solid`,
            borderRadius: getAvatarWidth() / 2
        },
        detail: {
            flex: 3,
            borderLeft: `0.5px ${theme.palette.divider} solid`
        }
    }))

    const classes = createStyle()
    const { author = null } = props;
    if (null === author) {
        return (<p>User does not exist</p>)
    }
    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.header}
                title={author.name}
                titleTypographyProps={{ variant: "body1" }}
            />
            <CardContent className={classes.content}>
                <div className={classes.avatar}>
                    {<img src={process.env.PUBLIC_URL + (null != author.avatarURL ? author.avatarURL : logo)} className={classes.avatarLogo} alt={author.name} />}
                    {/* <img src={logo} className={classes.avatarLogo} alt={author.name} /> */}
                </div>
                <div className={classes.detail}>
                    {props.children}
                </div>
            </CardContent>
        </Card>
    )
}
