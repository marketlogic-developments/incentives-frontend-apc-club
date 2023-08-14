import React from 'react'
import { TitleWithIcon } from '../../../components'

const Summary = () => {
  return (
    <div className="mt-8">
         <div className="pt-2 grid items-center grid-rows-1 gap-3">
        <TitleWithIcon icon={<User />} title={t("Reportes.user_performance")} />
      </div>
    </div>
  )
}

export default Summary