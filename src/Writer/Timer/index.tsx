import React from 'react';
import { Button, Header, Grid, Segment } from 'semantic-ui-react';

interface TimerProps {
  notifyFinished: Function;
}

function Timer({ notifyFinished }: TimerProps) {
  const [counter, setCounter] = React.useState(60);
  const [isCounting, setCounting] = React.useState(false);

  // our timer guts: decrements counter every second
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (isCounting && counter > 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);
      return () => clearInterval(timer);
    }

    if (counter === 0) {
      setCounting(false);
      notifyFinished(true);
    }
  }, [counter, isCounting, notifyFinished]);

  // auto-focus text area when starting timer
  function start() {
    notifyFinished(false);
    setCounting(true);
  }

  function stop() {
    setCounting(false);
    notifyFinished(true);
  }

  return (
    <Segment>
      <Header as="h1">
        {Math.floor(counter / 60)
          .toString()
          .padStart(1, '0')}
        :{(counter % 60).toString().padStart(2, '0')}
      </Header>
      <Grid.Row>
        <Button content="Start" primary disabled={isCounting} onClick={start} />
        <Button
          content="Stop"
          secondary
          disabled={!isCounting}
          onClick={stop}
        />
      </Grid.Row>
    </Segment>
  );
}

export default Timer;
