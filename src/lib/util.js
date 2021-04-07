export const validateEmail = mail =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    mail
  )

export const authFetch = async (link, data) => {
  return await fetch(link, {
    method: data?.method || 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('RTMAuthToken')}`,
      ...data?.headers,
    },
    body: data?.body,
  })
}

export const logoutUser = async () => {
  localStorage.removeItem('RTMAuthToken')
  window.location.reload()
}
