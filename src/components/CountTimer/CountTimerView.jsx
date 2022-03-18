import styled from "@emotion/styled";

export default function CountTimerView({
  milliseconds,
  onStartButtonClick,
  onStopButtonClick,
  onPauseButtonClick,
  isRunning,
}) {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const hours = parseInt(totalSeconds / 3600).toString()
  const minutes = parseInt((totalSeconds % 3600) / 60).toString()
  const seconds = parseInt((totalSeconds % 3600) % 60).toString()

  return (
    <CountTimerViewWrapper>
      <TimeWrapper>
        {hours.padStart(2, "0") + ":" + minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0")}
      </TimeWrapper>
      {!isRunning ? (
        <ButtonWrapper onClick={onStartButtonClick} backgroundColor={"#DA291C"} color={"#FFFFFF"}>Start</ButtonWrapper>
      ) : (
        <>
          <ButtonWrapper onClick={onStopButtonClick} backgroundColor={"#DA291C"} color={"#FFFFFF"}>Stop</ButtonWrapper>
          <ButtonWrapper onClick={onPauseButtonClick} backgroundColor={"#27251F"} color={"#FFFFFF"}>Pause</ButtonWrapper>
        </>
      )}
    </CountTimerViewWrapper>
  )
}

const CountTimerViewWrapper = styled.div`
  text-align: center;
`

const TimeWrapper = styled.div`
  font-size: 100px;
  color: #27251F;
  font-weight: 800;
`

const ButtonWrapper = styled.button`
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 50px;
  background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "#DA291C"};
  color:  ${(props) => props.color ? props.color : "#FFFFFF"};
  font-size: 24px;
  font-weight: 600;
`
