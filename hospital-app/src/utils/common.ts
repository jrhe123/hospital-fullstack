export const phoneFormat = (input: string) => {
  if (!input || Number.isNaN(input)) return `input must be a number was sent ${input}`
  if (input.length === 10) {
    return input.replace(/(\d{3})(\d{3})(\d{4})/, '+1($1) $2-$3')
  }
  if (input.length === 11) {
    return input.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1($2) $3-$4')
  }
  return input
}

export const truncate = (str: string, maxlength: number) =>
  str.length > maxlength ? `${str.slice(0, maxlength - 1)}...` : str
