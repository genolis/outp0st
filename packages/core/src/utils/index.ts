export function GetId() {
  return Date.now() + new Date().getMilliseconds();
}

export function getTabTitle(title: string) {
  console.log('tst');
  return title.slice(0, 3).toUpperCase();
}

export function test(title: string) {
  console.log('tst');
}
