function create({ id, name, count }: TagPropsType) {
  const allTags = getAll();
  allTags.push({ id, name, count, active: true })
  localStorage.setItem('tags', JSON.stringify(allTags));
}

function cancel({ id, name, count }: TagPropsType) {
  const allTags = getAll();
  const currentIndex = allTags.findIndex((tag: TagPropsType) => tag.id === id);
  allTags.splice(currentIndex, 1);
  localStorage.setItem('tags', JSON.stringify(allTags));
}

function edit({ id, name, count, active }: TagPropsType) {
  const allTags = JSON.parse(localStorage.getItem('tags')||'[]');
  const currentIndex = allTags.findIndex((tag: TagPropsType) => tag.id === id);
  allTags.splice(currentIndex, 1, { id, name, count, active });
  localStorage.setItem('tags', JSON.stringify(allTags));
}

function getAll() {
  const tags = JSON.parse(localStorage.getItem('tags')||'[]');
  const result = tags.filter((tag:TagPropsType) => tag.count > 0);
  localStorage.setItem('tags', JSON.stringify(result));

  return result;
}

interface TagPropsType {
  id: number;
  name: string;
  count: number;
  active?: boolean;
}

export { create, cancel, edit, getAll };
export type { TagPropsType };
