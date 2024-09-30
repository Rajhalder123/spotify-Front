import React from "react";
import "./Body.css";
import Header from "./Header";
import { useDataLayerValue } from "./DataLayer";
import { PlayCircleFilled, Favorite, MoreHoriz } from "@material-ui/icons";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ discover_weekly, token }] = useDataLayerValue();

  const playSong = async (trackUri) => {
    console.log("Playing song with URI:", trackUri);

    try {
      // Fetch the list of devices
      const devicesResponse = await fetch("https://api.spotify.com/v1/me/player/devices", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const devicesData = await devicesResponse.json();
      let activeDevice = devicesData.devices.find((device) => device.is_active);

      if (!activeDevice) {
        // No active device found, try to transfer playback to the first available device
        const device = devicesData.devices[0];
        if (device) {
          await fetch("https://api.spotify.com/v1/me/player", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ device_ids: [device.id], play: true }),
          });
          activeDevice = device;
        } else {
          alert("No available device found. Please open Spotify on one of your devices.");
          return;
        }
      }

      // Play the song on the active device
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${activeDevice.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ uris: [trackUri] }),
      });
      console.log("Song is now playing.");
    } catch (error) {
      console.error('Error playing song:', error);
      alert("An error occurred while trying to play the song. Please try again.");
    }
  };

  // Ensure discover_weekly is defined
  if (!discover_weekly) {
    return <div>Loading...</div>; // Optional: A loading state can be added here
  }

  return (
    <div className="body">
      <Header spotify={spotify} />
      <div className="body__info">
        <img src={discover_weekly.images[0]?.url} alt="" />
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilled className="body__shuffle" />
          <Favorite fontSize="large" />
          <MoreHoriz />
        </div>
        {discover_weekly.tracks.items.map((item) => (
          <SongRow key={item.track.id} track={item.track} playSong={playSong} />
        ))}
      </div>
    </div>
  );
}

export default Body;
