export default function (doc) {
  if (doc.isBroken) {
    return '/not-found';
  }

  if (doc.type === 'home') {
    return '/';
  }

  if (doc.type === 'events') {
    return `/events/${doc.uid}/${doc.data.flickr_photoset_id}`;
  }

  return '/not-found';
};