import React, {forwardRef} from "react";
import './Message.css'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export const Message = forwardRef(({username, message}, ref) => {

    const isUSer = username === message.username
    const setClass = () => {
        if(isUSer){
            return 'message__user'
        }
        return ''
    }

    return(
        <div ref={ref} className={`message ${setClass()}`}>
            <Card className={isUSer ? 'message__userCard' : 'message__guestCard'}>
                <CardContent>
                    <Typography color="textSecondary">
                        {isUSer ? undefined : message.username === null ? 'Unknown says :' : message.username + ' :'}
                    </Typography>
                    <Typography
                        variant={'h5'}
                        component={'h2'}>
                        {message.message}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
})