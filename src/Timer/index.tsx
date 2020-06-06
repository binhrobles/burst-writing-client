import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Grid, Segment, TextArea } from 'semantic-ui-react';

function Timer(props: any) {
  const { textInputRef, notifyFinished } = props;
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
    const node = textInputRef.current;
    if (node) node.focus();
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

Timer.propTypes = {
  textInputRef: PropTypes.shape({
    current: PropTypes.instanceOf(TextArea),
  }).isRequired,
  notifyFinished: PropTypes.func.isRequired,
};

export default Timer;
