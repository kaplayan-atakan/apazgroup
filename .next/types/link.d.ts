// Type definitions for Next.js routes

/**
 * Internal types used by the Next.js router and Link component.
 * These types are not meant to be used directly.
 * @internal
 */
declare namespace __next_route_internal_types__ {
  type SearchOrHash = `?${string}` | `#${string}`
  type WithProtocol = `${string}:${string}`

  type Suffix = '' | SearchOrHash

  type SafeSlug<S extends string> = S extends `${string}/${string}`
    ? never
    : S extends `${string}${SearchOrHash}`
    ? never
    : S extends ''
    ? never
    : S

  type CatchAllSlug<S extends string> = S extends `${string}${SearchOrHash}`
    ? never
    : S extends ''
    ? never
    : S

  type OptionalCatchAllSlug<S extends string> =
    S extends `${string}${SearchOrHash}` ? never : S

  type StaticRoutes = 
    | `/`
    | `/api/forms/basvuru-extended`
    | `/api/forms/basvuru`
    | `/api/forms/franchising`
    | `/api/forms/iletisim`
    | `/api/og`
    | `/`
    | `/insan_kaynaklari_politikamiz`
    | `/bize_katilin`
    | `/basvuru_formu`
    | `/tr/basvuru_formu`
    | `/apaz_group_hakkinda`
    | `/tr/hakkimizda/apaz-group-hakkinda`
    | `/en/hakkimizda/apaz-group-hakkinda`
    | `/tr/apaz-group-hakkinda`
    | `/en/apaz-group-hakkinda`
    | `/franchising`
    | `/haberler`
    | `/iletisim`
    | `/en/basvuru-formu`
    | `/kalite`
    | `/tr/kalite`
    | `/en/kalite`
    | `/kariyer_egitim`
    | `/kariyer-ve-egitim-olanaklarimiz`
    | `/tr/kariyer-ve-egitim-olanaklarimiz`
    | `/en/kariyer-ve-egitim-olanaklarimiz`
    | `/kurum_kulturumuz_ve_etik_politikamiz`
    | `/kurumsal_sosyal_sorumluluk_politikasi`
    | `/olanaklar`
    | `/tr/olanaklar`
    | `/en/olanaklar`
    | `/performans`
    | `/tr/performans`
    | `/en/performans`
    | `/pide_by_pide`
    | `/tr/pide-by-pide`
    | `/en/pide-by-pide`
    | `/seffaflik_ve_hesap_verebilirlik`
    | `/ucret_politikamiz`
    | `/tr/ucret-politikamiz`
    | `/en/ucret-politikamiz`
    | `/yonetim`
    | `/tr/yonetim`
    | `/en/yonetim`
    | `/baydoner`
    | `/tr/baydoner`
    | `/en/baydoner`
    | `/bursaishakbey`
    | `/tr/bursa-ishakbey`
    | `/en/bursa-ishakbey`
    | `/tr/insan-kaynaklari-politikamiz`
    | `/en/insan-kaynaklari-politikamiz`
    | `/tr/kurum-kulturumuz-ve-etik-degerlerimiz`
    | `/en/kurum-kulturumuz-ve-etik-degerlerimiz`
    | `/kisisel-verilerin-korunmasi`
    | `/cerez-politikasi`
  type DynamicRoutes<T extends string = string> = 
    | `/${SafeSlug<T>}`
    | `/${SafeSlug<T>}/kariyer/kariyer-egitim`
    | `/${SafeSlug<T>}/kariyer/kurum-kulturumuz-ve-etik-degerlerimiz`
    | `/${SafeSlug<T>}/kariyer/olanaklar`
    | `/${SafeSlug<T>}/kariyer/performans`
    | `/${SafeSlug<T>}/kariyer/ucret-politikamiz`
    | `/${SafeSlug<T>}/haberler/haber1`
    | `/${SafeSlug<T>}/haberler/haber2`
    | `/${SafeSlug<T>}/haberler/haber4`
    | `/${SafeSlug<T>}/haberler/haber3`
    | `/${SafeSlug<T>}/hakkimizda/kalite`
    | `/${SafeSlug<T>}/kurumsal-sosyal-sorumluluk-politikasi`
    | `/${SafeSlug<T>}/markalarimiz/baydoner`
    | `/${SafeSlug<T>}/markalarimiz/bursa-ishakbey`
    | `/${SafeSlug<T>}/markalarimiz/pide-by-pide`
    | `/${SafeSlug<T>}/seffaflik-ve-hesap-verebilirlik`
    | `/${SafeSlug<T>}/cerez-politikasi`
    | `/${SafeSlug<T>}/kisisel-verilerin-korunmasi`
    | `/${SafeSlug<T>}/${SafeSlug<T>}`
    | `/${SafeSlug<T>}/basvuru-formu`
    | `/${SafeSlug<T>}/franchising`
    | `/${SafeSlug<T>}/haberler`
    | `/${SafeSlug<T>}/haberler/${SafeSlug<T>}`
    | `/${SafeSlug<T>}/baydoner`
    | `/${SafeSlug<T>}/hakkimizda`
    | `/${SafeSlug<T>}/hakkimizda/apaz-group-hakkinda`
    | `/${SafeSlug<T>}/hakkimizda/yonetim`
    | `/${SafeSlug<T>}/hakkimizda/yonetim/${SafeSlug<T>}`
    | `/${SafeSlug<T>}/bize-katilin`
    | `/${SafeSlug<T>}/iletisim`
    | `/${SafeSlug<T>}/kariyer/basvuru-formu`
    | `/${SafeSlug<T>}/kariyer/insan-kaynaklari-politikamiz`
    | `/${SafeSlug<T>}/insan-kaynaklari-politikamiz`
    | `/${SafeSlug<T>}/ui-playground`

  type RouteImpl<T> = 
    | StaticRoutes
    | SearchOrHash
    | WithProtocol
    | `${StaticRoutes}${SearchOrHash}`
    | (T extends `${DynamicRoutes<infer _>}${Suffix}` ? T : never)
    
}

declare module 'next' {
  export { default } from 'next/types/index.js'
  export * from 'next/types/index.js'

  export type Route<T extends string = string> =
    __next_route_internal_types__.RouteImpl<T>
}

declare module 'next/link' {
  import type { LinkProps as OriginalLinkProps } from 'next/dist/client/link.js'
  import type { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'
  import type { UrlObject } from 'url'

  type LinkRestProps = Omit<
    Omit<
      DetailedHTMLProps<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
      keyof OriginalLinkProps
    > &
      OriginalLinkProps,
    'href'
  >

  export type LinkProps<RouteInferType> = LinkRestProps & {
    /**
     * The path or URL to navigate to. This is the only required prop. It can also be an object.
     * @see https://nextjs.org/docs/api-reference/next/link
     */
    href: __next_route_internal_types__.RouteImpl<RouteInferType> | UrlObject
  }

  export default function Link<RouteType>(props: LinkProps<RouteType>): JSX.Element
}

declare module 'next/navigation' {
  export * from 'next/dist/client/components/navigation.js'

  import type { NavigateOptions, AppRouterInstance as OriginalAppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime.js'
  interface AppRouterInstance extends OriginalAppRouterInstance {
    /**
     * Navigate to the provided href.
     * Pushes a new history entry.
     */
    push<RouteType>(href: __next_route_internal_types__.RouteImpl<RouteType>, options?: NavigateOptions): void
    /**
     * Navigate to the provided href.
     * Replaces the current history entry.
     */
    replace<RouteType>(href: __next_route_internal_types__.RouteImpl<RouteType>, options?: NavigateOptions): void
    /**
     * Prefetch the provided href.
     */
    prefetch<RouteType>(href: __next_route_internal_types__.RouteImpl<RouteType>): void
  }

  export declare function useRouter(): AppRouterInstance;
}
