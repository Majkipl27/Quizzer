import classes from './NavCounter.module.css';

interface NavCounterProps {
    stage: number;
}

const NavCounter = ({stage}: NavCounterProps) => {
    const activeDot = {
      background: "#45E52B",
      color: "var(--font-clr)",
    };

    return (
      <div className={classes.navCounter}>
        <div className={classes.dot} style={activeDot}>
          1
        </div>
        <div className={classes.dot} style={stage > 1 ? activeDot : {}}>
          2
        </div>
        <div className={classes.dot} style={stage > 2 ? activeDot : {}}>
          3
        </div>
      </div>
    );
}

export default NavCounter;