'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Hint, Story } from '../kit';

const ShaderGallery = dynamic(() => import('../webgl/ShaderGallery'), { ssr: false });

export default function WebGLStories() {
  return (
    <>
      <Story
        title="Shaders"
        description="A live example of every WebGL effect built in the shader lab, each in its own canvas so it can be referenced in isolation."
        surface="none"
        padding="none"
      >
        <ShaderGallery />
      </Story>

      <Story title="Full lab" padding="default">
        <Hint>
          <span>
            These run on the lab&apos;s defaults. To tune one with live controls, or see the
            full-page versions, open <Link href="/shader-test">/shader-test</Link> and pick it from
            the architecture control.
          </span>
        </Hint>
      </Story>
    </>
  );
}
