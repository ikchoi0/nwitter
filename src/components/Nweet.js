import { async } from '@firebase/util';
import { dbService, deleteDoc, doc, updateDoc } from 'fBase';
import React from 'react';

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = React.useState(false);
  const [newNweet, setNewNweet] = React.useState(nweetObj.text);
  const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await deleteDoc(NweetTextRef);
      console.log('ok');
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    setNewNweet(event.target.value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              placeholder="Edit your nweet"
              type="text"
              value={newNweet}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text} </h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
