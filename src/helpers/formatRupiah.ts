const formatRupiah = (nominal: number | string) => {
  const number_string = nominal.toString();
  const split = number_string.split(',');
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join(',');
  }
  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

  return rupiah;
};

export default formatRupiah;
