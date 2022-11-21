const pad = (num: number, replace?: string): string => {
  return num.toString().padStart(2, replace || "0")
}

const getDateTransform = (Date: any) => {
  return `${Date.getFullYear()}-${pad(Date.getMonth() + 1)}-${pad(Date.getDate())}`
}

export {
  pad,
  getDateTransform
}
