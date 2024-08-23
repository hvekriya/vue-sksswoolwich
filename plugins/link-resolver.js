export default function (doc) {
  if (doc.isBroken) {
    return '/not-found';
  }

  if (doc.type === 'home') {
    return '/';
  }

  if (doc.type === 'events') {
    return `/events/${doc.uid}/:id`;
  }

  return '/not-found';
};