import { FC, useContext } from "react"
import { Button } from "~/components/ui/button"
import { useToast } from "~/components/ui/use-toast"
import { ContainerContext } from "~/infrastructure/injector/context"

export const AccountPage: FC = () => {
  const { driver, store } = useContext(ContainerContext)
  const me = store.me((state) => state.me)
  const meLoading = store.me((state) => state.isLoading)

  const { toast } = useToast()

  const onClick = async () => {
    const res = await driver.firebase.signOut()
    if (!res) {
      toast({
        title: "ログアウトしました。"
      })
      return
    }
  }

  if (me === null || meLoading) {
    return <div>loading...</div>
  }

  return (
    <>
      <main>
        <Button onClick={onClick}>ログアウト</Button>
        <div>
          <p>アカウントページ</p>
          <p>{me.user.name.value}</p>
        </div>
      </main>
    </>
  )
}
