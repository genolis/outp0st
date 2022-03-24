import React, { ReactNode, Suspense, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import classNames from "classnames/bind"
import capitalize from "@mui/utils/capitalize"
import styles from "./Tabs.module.scss"
import { useHashParser } from "pages/lunaverse/hooks/useHashParser"

const cx = classNames.bind(styles)

interface Props {
  tabs: { key: string; tab: string; children: ReactNode; disabled?: boolean }[]
  defaultActiveKey?: string
  type: "line" | "card"
  reversed?: boolean
  state?: boolean
}

const Tabs = ({ tabs, defaultActiveKey, type, reversed, state }: Props) => {
  const initial = defaultActiveKey ?? tabs[0].key
  const navigate = useNavigate()
  const { hash } = useHashParser()

  useEffect(() => {
    if (!state && !hash) navigate({ hash: initial }, { replace: true })
  }, [hash, initial, navigate, state])

  /* state */
  const [activeKey, setActiveKey] = useState(initial)

  const LazyLoadTabContent = () => {
    return tabs.find((tab) => tab.key === (state ? activeKey : hash))?.children
  }

  return (
    <>
      <section className={cx(styles.tabs, type, { reversed })}>
        {tabs.map(({ key, tab, disabled }) =>
          state ? (
            <button
              type="button"
              className={cx(styles.tab, {
                active: key === activeKey,
                disabled,
              })}
              onClick={() => !disabled && setActiveKey(key)}
              disabled={disabled}
              key={key}
            >
              {capitalize(tab)}
            </button>
          ) : disabled ? (
            <span className={classNames(styles.tab, styles.disabled)} key={key}>
              {capitalize(tab)}
            </span>
          ) : (
            <Link
              className={cx(styles.tab, { active: key === hash })}
              to={{ hash: key }}
              key={key}
            >
              {capitalize(tab)}
            </Link>
          )
        )}
      </section>
      <Suspense fallback={<>Loading...</>}>{LazyLoadTabContent()}</Suspense>
    </>
  )
}

export default Tabs
