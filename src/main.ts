import { getAccessToken, redirectToAuthCodeFlow } from "./authCode";

const clientId = "863909175bcd43b9a7978b891afbc780";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const accessToken = await getAccessToken(clientId, code);
  const profile = await fetchProfile(accessToken);
  const topTracks = await fetchTracks(accessToken);
  const topArtists = await fetchArtists(accessToken);
  console.log(topTracks);

  console.log(profile);

  populateUI(profile);
  presentTopTracks(topTracks);
  presentTopArtists(topArtists);
  console.log(topArtists);
}

async function fetchProfile(token: string): Promise<UserProfile> {
  //TODO: Call Web API
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

async function fetchTracks(token: string): Promise<TopItems> {
  const result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

async function fetchArtists(token: string): Promise<TopArtists> {
  const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return await result.json();
}

function populateUI(profile: UserProfile) {
  //TODO: Update UI with profile data
  document.getElementById("displayName")!.innerHTML = profile.display_name;
  if (profile.images[0]) {
    const profileImage = new Image(400, 400);
    profileImage.src = profile.images[0].url;
    document.getElementById("avatar")!.appendChild(profileImage);
  }
  document.getElementById("id")!.innerText = profile.id;
  document.getElementById("email")!.innerText = profile.email;
  document.getElementById("uri")!.innerText = profile.uri;
  document
    .getElementById("uri")!
    .setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url")!.innerText = profile.href;
  document.getElementById("url")!.setAttribute("href", profile.href);
  document.getElementById("imgUrl")!.innerText =
    profile.images[0]?.url ?? "(no profile image)";
}

function presentTopTracks(profile: TopItems) {
  const topTracks = document.getElementById("topTracks")!;
  let trackList = profile.items;
  console.log(trackList);

  trackList.forEach((e) => {
    let trackContainer = document.createElement("div");
    let artistName = document.createElement("h3");
    let songName = document.createElement("h4");
    let img = document.createElement("img");

    artistName.innerHTML = e.album.artists[0].name;
    songName.innerHTML = e.album.name;
    img.src = e.album.images[0].url;
    img.className = "img";

    trackContainer.appendChild(artistName);
    trackContainer.appendChild(songName);
    trackContainer.appendChild(img);

    topTracks.appendChild(trackContainer);
  });
}

function presentTopArtists(profile: TopArtists) {
  const topArtist = document.getElementById("topArtists")!;
  let artistList = profile.items;
  console.log(artistList);

  artistList.forEach((e) => {
    let artistContainer = document.createElement("div");
    let artistName = document.createElement("h3");
    let img = document.createElement("img");

    let genres = e.genres;

    genres.forEach((e) => {
      let genContainer = document.createElement("div");
      let gen = document.createElement("p");

      gen.innerHTML = e;
      genContainer.appendChild(gen);
      artistContainer.appendChild(genContainer);
    })

    artistName.innerHTML = e.name;
    img.src  = e.images[0].url;
    img.className = "img";

    artistContainer.appendChild(artistName);
    artistContainer.appendChild(img);
    topArtist.appendChild(artistContainer);
  });
}
