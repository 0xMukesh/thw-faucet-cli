import type { NextPage } from 'next'

const Done: NextPage = () => {
  return (
    <p className="m-12 font-medium text-gray-600">
      You have successfully connected your metamask wallet to the CLI. You can
      now close this tab and return to the CLI
    </p>
  )
}

export default Done
