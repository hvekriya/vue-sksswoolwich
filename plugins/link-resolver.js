export default function (doc) {
  if (doc.isBroken) {
    return '/not-found';
  }

  if (doc.type === 'home') {
    return '/';
  }

  if (doc.type === 'events') {
      console.log(doc)
    return '/events/' + doc.uid + '?event_id=';
  }

  return '/not-found';
};