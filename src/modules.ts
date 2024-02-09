interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface TopArtists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: [
    {
      external_urls: {
          spotify: string;
      }
      followers: {
        href: string;
        total: number;
      }
      genres: [string];
      href: string;
      id: string;
      images: [
        {
          url: string;
          height: number;
          widht: number;
        }
      ]
      name: string;
      popularity: number;
      type: string;
      uri: string;
    }
  ];
}

interface TopItems {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: [
    {
      album: {
        album_type: string;
        artists:[
            {
                name: string;
            }
        ]
        total_tracks: number;
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: {
          isrc: string;
          ean: string;
          upc: string;
        };
        external_urls: {
            spotify: string;
        }
        href: string;
        id: string;
        images: [
            {
                height:number;
                url: string;
                width: number;
            }
        ]
        is_playable: boolean;
        linked_from: {};
        restrictions: {
            reason: string;
        }
        name: string;
        popularity: number;
        preview_url: string;
        track_number: string;
        type: string;
        uri: string;
        is_local: boolean;
      };
    }
  ];
}
