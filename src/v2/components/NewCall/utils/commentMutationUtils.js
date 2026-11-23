export const unwrapCommentMutation = (payload) => {
  const value = Array.isArray(payload) ? payload[0] : payload;
  return value?.Data?.rd1?.[0] || value?.rd1?.[0] || value?.data?.rd1?.[0] || value?.data || value;
};

export const getCommentRecordId = (comment) =>
  comment?.CommentId ?? comment?.CommentID ?? comment?.commentId ?? comment?.id ?? comment?.Id;

export const parseCallComments = (record) => {
  if (Array.isArray(record?.comments)) return record.comments;
  const raw = record?.comment ?? record?.comments ?? record?.CommentsArray;
  if (Array.isArray(raw)) return raw;
  if (typeof raw !== 'string' || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
};

export const applyCommentMutation = (record, mutation) => {
  const comments = parseCallComments(record);
  const commentId = mutation?.commentId;
  if (commentId == null) return record;

  if (mutation.type === 'delete') {
    const next = comments.filter((comment) => String(getCommentRecordId(comment)) !== String(commentId));
    if (next.length === comments.length) return record;
    return { ...record, comment: JSON.stringify(next), comments: next };
  }

  const incoming = mutation.comment || {};
  const index = comments.findIndex((comment) => String(getCommentRecordId(comment)) === String(commentId));
  const previous = index >= 0 ? comments[index] : {};
  const text = incoming.Comments ?? incoming.comment ?? incoming.text ?? previous.text ?? previous.Comments ?? '';
  const hasFilePath = ['FilePath', 'filePath', 'img'].some((key) => Object.prototype.hasOwnProperty.call(incoming, key));
  const filePath = hasFilePath
    ? (incoming.FilePath ?? incoming.filePath ?? incoming.img ?? '')
    : (previous.FilePath ?? previous.filePath ?? previous.img ?? '');
  const updated = {
    ...previous,
    ...incoming,
    id: commentId,
    text,
    comment: text,
    Comments: text,
    FilePath: filePath,
    img: filePath,
  };
  const next = [...comments];
  if (index >= 0) next[index] = updated;
  else next.push(updated);
  return { ...record, comment: JSON.stringify(next), comments: next };
};
