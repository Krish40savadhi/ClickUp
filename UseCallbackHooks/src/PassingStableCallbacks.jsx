import { useState, useCallback ,memo} from 'react';


function List({ items, onItemClick }) {
  console.log('List rendered and will not render again');
  return items.map((item) => (
    <button key={item} onClick={() => onItemClick(item)}>
      {item}
    </button>
  ));
}

const MemoizedList = memo(List);
// memo ni aandar aakho component hoi , etle component memoize kariye jenathi ene unncessary re-render no karvu pade .....
// it only re-render when the props of list {items , onItemClick} changes.

function PassingStableCallbacks() {
  const [items] = useState(['A', 'B', 'C']);
  const [selected, setSelected] = useState(null);

  const handleItemClick = useCallback((item) => {
    setSelected(item);
  }, []); // only recreated if dependencies change
  //Without useCallback, handleItemClick would be a new function on each render, causing MemoizedList to re-render unnecessarily.

  return (
    <div>
      <MemoizedList items={items} onItemClick={handleItemClick} />
      <p>Selected: {selected}</p>
      <p>please don't forget tot check the console!!</p>
    </div>
  );
}

export default PassingStableCallbacks;    