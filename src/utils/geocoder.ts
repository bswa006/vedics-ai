export interface GeocodingResult {
  latitude: number;
  longitude: number;
}

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const geocoder = new google.maps.Geocoder();

export async function getAddressFromCoordinates(latitude: number, longitude: number): Promise<string | null> {
  if (!API_KEY) {
    console.error('Google Maps API key is not set');
    return null;
  }

  try {
    const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode(
        {
          location: { lat: latitude, lng: longitude },
          language: 'en',
          region: 'in'
        },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results) {
            resolve(results);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        }
      );
    });

    if (results && results.length > 0) {
      const firstResult = results[0];
      if (!firstResult) {
        return null;
      }
      
      const addressComponents = firstResult.address_components;
      if (!addressComponents) {
        return null;
      }

      const city = addressComponents.find(component => 
        component.types.includes('locality'))?.long_name;
      const state = addressComponents.find(component => 
        component.types.includes('administrative_area_level_1'))?.long_name;
      const country = addressComponents.find(component => 
        component.types.includes('country'))?.long_name;

      const addressParts = [city, state, country].filter(Boolean);
      return addressParts.join(', ');
    }
    return null;
  } catch (error) {
    console.error('Error getting address from coordinates:', error);
    return null;
  }
}

export async function getCoordinatesFromAddress(address: string): Promise<GeocodingResult | null> {
  if (!API_KEY) {
    console.error('Google Maps API key is not set');
    return null;
  }

  try {
    const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode(
        { address },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
            resolve(results);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        }
      );
    });

    const location = results[0].geometry.location;
    return {
      latitude: location.lat(),
      longitude: location.lng()
    };
  } catch (error) {
    console.error('Error getting coordinates from address:', error);
    return null;
  }
}
