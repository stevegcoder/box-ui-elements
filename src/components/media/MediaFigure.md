> **Note**
>
> `Media` is a compound component, the inner elements are not meant to be used outside of the Media container

```js
const { MenuItem } = require('../menu');

<Media style={{ width: 300 }}>
  <Media.Figure style={{ boxShadow: '0 0 2px 3px red' }}>
    <Avatar size="large" />
  </Media.Figure>

  <Media.Body>
    <Media.Menu>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Delete</MenuItem>
    </Media.Menu>
    <div>
      <b>Yo Yo Ma</b> commented on this file
    </div>
    <div>
      Please review the notes
      <br />a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8
      9 0 1 2 3 4 5 6 7 8 9
    </div>
  </Media.Body>
</Media>;
```
