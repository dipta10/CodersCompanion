Don't mind me, I'm am new to react. :(

* NO **CURLY BRACES** for importing a react component.<br>
  USE CURLEY BRACE and you'll never find where your props went.<br>
  Now this holds true for stateless components as well.<br>
```javascript
// inside any component file where you want to import
import Navbar from "./Components/layout/Navbar";
```

```javascript
// this is just a normal component
export class Navbar extends Component {
  render() {
    return (
      <div>
        something...
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
  }
}

export default connect(mapStateToProps)(Navbar);
```

*   Security
*   Cloud Function