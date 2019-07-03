import React from 'react'
import QuizTemplate from './QuizTemplate';
import QuizResultItem from './QuizResultItem';

export default function QuizResult(props) {

    return (
        <QuizTemplate>
            <div style={{ textAlign: "left", margin: "0px 10px 0px 10px" }}>
                <h3>Result:</h3>
                <QuizResultItem key="optionOne" />
                <QuizResultItem key="optionTwo" />
            </div>
        </QuizTemplate>
    )
}