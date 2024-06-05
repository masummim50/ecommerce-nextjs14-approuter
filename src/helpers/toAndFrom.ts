type metaInfo = {
  page: number;
  size: number;
  total: number;
  totalPage: number;
};

export function getToAndFrom(metaInfo: metaInfo) {
  console.log("metainfo: ", metaInfo);
  const from = metaInfo.page * metaInfo.size - (metaInfo.size - 1);

  const to =
    metaInfo.total - metaInfo.page * metaInfo.size >= 0
      ? metaInfo.page * metaInfo.size
      : metaInfo.total;

  return { to, from, total: metaInfo.total };
}
