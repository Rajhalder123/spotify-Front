import React from "react";
import "./SongRow.css";

function SongRow({ track, playSong }) {
  return (
    <div className="songRow" onClick={() => playSong(track.uri)}>
      <img className="songRow__album" src={track.album.images[0].url} alt={track.name} />
      <div className="songRow__info">
        <h1>{track.name}</h1>
        <p>
          {track.artists.map((artist) => artist.name).join(", ")} -{" "}
          {track.album.name}
        </p>
      </div>
    </div>
  );
}

export default SongRow;
