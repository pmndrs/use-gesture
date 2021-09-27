import { GPUFilterMode, GPUPrimitiveTopology, GPUIndexFormat } from './constants.js';

// Copyright 2020 Brandon Jones

class WebGPUTextureUtils {
  constructor(device, glslang) {
    this.device = device;
    const mipmapVertexSource = `#version 450
			const vec2 pos[4] = vec2[4](vec2(-1.0f, 1.0f), vec2(1.0f, 1.0f), vec2(-1.0f, -1.0f), vec2(1.0f, -1.0f));
			const vec2 tex[4] = vec2[4](vec2(0.0f, 0.0f), vec2(1.0f, 0.0f), vec2(0.0f, 1.0f), vec2(1.0f, 1.0f));
			layout(location = 0) out vec2 vTex;
			void main() {
				vTex = tex[gl_VertexIndex];
				gl_Position = vec4(pos[gl_VertexIndex], 0.0, 1.0);
			}
		`;
    const mipmapFragmentSource = `#version 450
			layout(set = 0, binding = 0) uniform sampler imgSampler;
			layout(set = 0, binding = 1) uniform texture2D img;
			layout(location = 0) in vec2 vTex;
			layout(location = 0) out vec4 outColor;
			void main() {
				outColor = texture(sampler2D(img, imgSampler), vTex);
			}`;
    this.sampler = device.createSampler({
      minFilter: GPUFilterMode.Linear
    }); // We'll need a new pipeline for every texture format used.

    this.pipelines = {};
    this.mipmapVertexShaderModule = device.createShaderModule({
      code: glslang.compileGLSL(mipmapVertexSource, 'vertex')
    });
    this.mipmapFragmentShaderModule = device.createShaderModule({
      code: glslang.compileGLSL(mipmapFragmentSource, 'fragment')
    });
  }

  getMipmapPipeline(format) {
    let pipeline = this.pipelines[format];

    if (pipeline === undefined) {
      pipeline = this.device.createRenderPipeline({
        vertexStage: {
          module: this.mipmapVertexShaderModule,
          entryPoint: 'main'
        },
        fragmentStage: {
          module: this.mipmapFragmentShaderModule,
          entryPoint: 'main'
        },
        primitiveTopology: GPUPrimitiveTopology.TriangleStrip,
        vertexState: {
          indexFormat: GPUIndexFormat.Uint32
        },
        colorStates: [{
          format
        }]
      });
      this.pipelines[format] = pipeline;
    }

    return pipeline;
  }

  generateMipmaps(textureGPU, textureGPUDescriptor) {
    const pipeline = this.getMipmapPipeline(textureGPUDescriptor.format);
    const commandEncoder = this.device.createCommandEncoder({});
    const bindGroupLayout = pipeline.getBindGroupLayout(0); // @TODO: Consider making this static.

    let srcView = textureGPU.createView({
      baseMipLevel: 0,
      mipLevelCount: 1
    });

    for (let i = 1; i < textureGPUDescriptor.mipLevelCount; i++) {
      const dstView = textureGPU.createView({
        baseMipLevel: i,
        mipLevelCount: 1
      });
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [{
          attachment: dstView,
          loadValue: [0, 0, 0, 0]
        }]
      });
      const bindGroup = this.device.createBindGroup({
        layout: bindGroupLayout,
        entries: [{
          binding: 0,
          resource: this.sampler
        }, {
          binding: 1,
          resource: srcView
        }]
      });
      passEncoder.setPipeline(pipeline);
      passEncoder.setBindGroup(0, bindGroup);
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.endPass();
      srcView = dstView;
    }

    this.device.queue.submit([commandEncoder.finish()]);
  }

}

export default WebGPUTextureUtils;
