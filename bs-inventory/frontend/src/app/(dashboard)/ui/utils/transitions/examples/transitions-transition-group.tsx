import * as React from "react";
import { TransitionGroup } from "react-transition-group";

import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import NiBinEmpty from "@/icons/nexture/ni-bin-empty";

const FRUITS = ["🍏 Apple", "🍌 Banana", "🍍 Pineapple", "🥥 Coconut", "🍉 Watermelon"];

interface RenderItemOptions {
  item: string;
  handleRemoveFruit: (item: string) => void;
}

function renderItem({ item, handleRemoveFruit }: RenderItemOptions) {
  return (
    <ListItem
      secondaryAction={
        <IconButton size="small" edge="end" aria-label="delete" title="Delete" onClick={() => handleRemoveFruit(item)}>
          <NiBinEmpty size="small" />
        </IconButton>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  );
}

export default function TransitionsTransitionGroup() {
  const [fruitsInBasket, setFruitsInBasket] = React.useState(FRUITS.slice(0, 3));

  const handleAddFruit = () => {
    const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
    if (nextHiddenItem) {
      setFruitsInBasket((prev) => [nextHiddenItem, ...prev]);
    }
  };

  const handleRemoveFruit = (item: string) => {
    setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
  };

  const addFruitButton = (
    <Button variant="pastel" disabled={fruitsInBasket.length >= FRUITS.length} onClick={handleAddFruit}>
      Add fruit to basket
    </Button>
  );

  return (
    <div>
      {addFruitButton}
      <List className="border-grey-100 mt-2 rounded-lg border">
        <TransitionGroup>
          {fruitsInBasket.map((item) => (
            <Collapse key={item}>{renderItem({ item, handleRemoveFruit })}</Collapse>
          ))}
        </TransitionGroup>
      </List>
    </div>
  );
}
